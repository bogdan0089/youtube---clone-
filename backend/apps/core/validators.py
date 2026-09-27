from django.core.exceptions import ValidationError


def max_file_size(megabytes: int):
    def validator(file):
        if file.size > megabytes * 1024 * 1024:
            raise ValidationError(f'Файл має бути не більше {megabytes} МБ.')

    return validator
