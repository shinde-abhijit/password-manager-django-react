from django.db import models
import datetime


# Create your models here.
class PasswordManager(models.Model):
    EMAIL_CHOICE = [
        ('', 'Select Email Address'),
        ('a@a.com', 'a@a.com'),
        ('b@b.com', 'b@b.com'),
        ('c@c.com', 'c@c.com'),
        ('d@d.com', 'd@d.com'),
        ('e@e.com', 'e@e.com'),
        ('f@f.com', 'f@f.com'),
        ('g@g.com', 'g@g.com'),
        ('h@h.com', 'h@h.com'),
        ('i@i.com', 'i@i.com'),
        ('j@j.com', 'j@j.com'),
    ]
    
    select_date = models.DateField(default=datetime.date.today)
    website_name = models.CharField(max_length=50)
    website_url = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=50, blank=True)
    email_address = models.EmailField(choices=EMAIL_CHOICE)
    user_password = models.CharField(max_length=100, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Generate the website_url based on website_name
        if not self.website_url:
            # Convert website_name to a valid URL format
            self.website_url = f"http://www.{self.website_name.lower().replace(' ', '')}.com/"

        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'Website - {self.website_name}, Website Url - {self.website_url}, Username - {self.username}, Email Address - {self.email_address}, Created - {self.created.strftime("%b %d, %Y %H:%M:%S")}, Modified - {self.updated.strftime("%b %d, %Y %H:%M:%S")}'

    class Meta:
        verbose_name = 'Password Manager'
        verbose_name_plural = 'Password Manager'