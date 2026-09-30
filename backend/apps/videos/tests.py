import shutil
import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.channels.models import Channel
from apps.users.models import User
from apps.videos.models import Video

TEST_MEDIA_ROOT = tempfile.mkdtemp()


def make_video_file(name='clip.mp4'):
    return SimpleUploadedFile(name, b'fake video content', content_type='video/mp4')


@override_settings(MEDIA_ROOT=TEST_MEDIA_ROOT)
class VideoApiTests(APITestCase):
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(TEST_MEDIA_ROOT, ignore_errors=True)

    def setUp(self):
        self.owner = User.objects.create_user(username='owner1', email='owner@example.com', password='password123')
        self.channel = Channel.objects.create(owner=self.owner, handle='owner', name='Owner')
        self.stranger = User.objects.create_user(username='stranger', email='stranger@example.com', password='password123')

    def create_video(self):
        return Video.objects.create(channel=self.channel, title='My video', video_file=make_video_file())

    def upload(self, **data):
        payload = {'title': 'New video', 'video_file': make_video_file(), **data}
        return self.client.post(reverse('video-list'), payload, format='multipart')

    def test_list_is_public(self):
        self.create_video()
        response = self.client.get(reverse('video-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['channel']['handle'], 'owner')

    def test_upload_requires_login(self):
        response = self.upload()
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_upload_requires_channel(self):
        self.client.force_authenticate(self.stranger)
        response = self.upload()
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'].code, 'channel_required')

    def test_upload_creates_video_on_own_channel(self):
        self.client.force_authenticate(self.owner)
        response = self.upload()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data['id']), 11)
        self.assertEqual(response.data['channel']['handle'], 'owner')

    def test_upload_rejects_wrong_extension(self):
        self.client.force_authenticate(self.owner)
        response = self.upload(video_file=make_video_file('virus.exe'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('video_file', response.data)

    def test_detail_returns_404_for_unknown_id(self):
        response = self.client.get(reverse('video-detail', args=['doesNotExst']))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_owner_can_update(self):
        video = self.create_video()
        self.client.force_authenticate(self.owner)
        response = self.client.patch(reverse('video-detail', args=[video.id]), {'title': 'Renamed'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Renamed')

    def test_stranger_cannot_update(self):
        video = self.create_video()
        self.client.force_authenticate(self.stranger)
        response = self.client.patch(reverse('video-detail', args=[video.id]), {'title': 'Hacked'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_can_delete_and_file_is_removed(self):
        video = self.create_video()
        storage, file_name = video.video_file.storage, video.video_file.name
        self.client.force_authenticate(self.owner)
        response = self.client.delete(reverse('video-detail', args=[video.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Video.objects.filter(pk=video.id).exists())
        self.assertFalse(storage.exists(file_name))
