from unittest.mock import patch

from core import models

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import IntegrityError


def sample_user(email='test@pokemail.net', password='pass3'):
    """Returns a sample user"""
    return get_user_model().objects.create_user(email, password)


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'bullnight@pokemail.net'
        password = 'pass439'
        user = sample_user(email, password)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email of new user is normalized or not"""
        email = 'bullnight@POKEMAIL.net'
        user = get_user_model().objects.create_user(email, 'pass439')

        self.assertEqual(user.email, email.lower())

    def test_email_uniqueness(self):
        """test the uniqueness of the email of user"""
        email = 'bullnight@pokemail.net'
        with self.assertRaises(IntegrityError):
            get_user_model().objects.create_user(email, 'pass439')
            get_user_model().objects.create_user(email, 'pass539')

    def test_new_user_invalid_email(self):
        """Test creating new user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'pass539')

    def test_create_new_superuser(self):
        """Test creating new superuser"""
        user = get_user_model().objects.create_superuser(
            'bullnight@pokemail.net',
            'pass539'
        )
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_tag_str(self):
        """Test tag string representation"""
        tag = models.Tag.objects.create(
            user=sample_user(),
            name='sports'
        )
        self.assertEqual(str(tag), tag.name)

    def test_genre_str(self):
        """Test genre string representation"""
        genre = models.Genre.objects.create(
            user=sample_user(),
            name='Action'
        )
        self.assertEqual(str(genre), genre.name)

    def test_author_str(self):
        """Test author string representation"""
        author = models.Author.objects.create(
            user=sample_user(),
            name='Daniel Crieg',
            description="A great writer",
        )
        self.assertEqual(str(author), author.name)

    def test_book_str(self):
        """Test book string representation"""
        user = sample_user()
        book = models.Book.objects.create(
            user=user,
            title='Joy Life',
            price=90.50,
            author=models.Author.objects.create(
                user=user,
                name='Daniel Crieg',
                description="A great writer",
            ),
            genre=models.Genre.objects.create(
                user=user,
                name='Action'
            )
        )
        self.assertEqual(str(book), book.title)
