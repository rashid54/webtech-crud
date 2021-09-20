
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and save new user"""
        if not email:
            raise ValueError('Users must have email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


# class Tag(models.Model):
#     """Tag for books"""
#     name = models.CharField(max_length=255)
#
#     def __str__(self):
#         return self.name
#
#
# class Genre(models.Model):
#     """Genre for books"""
#     name = models.CharField(max_length=255)
#
#     def __str__(self):
#         return self.name


class Author(models.Model):
    """Authors of different books"""
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Book(models.Model):
    """Book model for storing books information"""
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(
        'Author',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

class Review(models.Model):
    """Review model for storing review information"""
    description = models.CharField(max_length=255)
    rating = models.IntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(10)])
    book = models.ForeignKey(
        'Book',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.description
