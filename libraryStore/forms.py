from django import forms  
from .models import User, Book  
from .models import User, Book  
from django.contrib.auth.forms import UserCreationForm  
from django.core.exceptions import ValidationError  
from django.forms.fields import EmailField  
from django.forms.forms import Form  
  
class RegisterationForm(UserCreationForm):  
    username = forms.CharField(label='Username', min_length=5, max_length=150, widget=forms.TextInput(attrs={'class': 'input usernameInput'}))  
    email = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'class': 'input email'}))  
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'class': 'input password'}))  
    password2 = forms.CharField(label='Repeat Password', widget=forms.PasswordInput(attrs={'class': 'input rPassword'}))  
    is_admin = forms.BooleanField(label='Admin', required = False, disabled = False, widget=forms.widgets.CheckboxInput(attrs={'id': 'admin'}))
  
    def username_clean(self):  
        username = self.cleaned_data['username'].lower()  
        new = User.objects.filter(username = username)  
        if new.count():  
            raise ValidationError("User Already Exist")  
        return username  
  
    def email_clean(self):  
        email = self.cleaned_data['email'].lower()  
        new = User.objects.filter(email=email)  
        if new.count():  
            raise ValidationError(" Email Already Exist")  
        return email  
  
    def clean_password2(self):  
        password1 = self.cleaned_data['password1']  
        password2 = self.cleaned_data['password2']  
  
        if password1 and password2 and password1 != password2:  
            raise ValidationError("Password don't match")  
        return password2  
  
    def save(self, commit = True):  
        user = User.objects.create_user(  
            username = self.cleaned_data['username'],  
            email = self.cleaned_data['email'],  
            password = self.cleaned_data['password1'],
            is_staff = self.cleaned_data['is_admin'],
        )
        return user
        # user = super().save(commit=False)
        # user.username = self.cleaned_data['username']
        # user.email = self.cleaned_data['email']
        # user.password = self.cleaned_data['password']
        # user.is_staff = self.cleaned_data['is_admin']
        # if commit:
        #     user.save()
        # return user
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'describtion', 'author_name', 'category', 'cover']
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': "Enter book's title", 'required': True, 'class': 'input', 'id':'name'}),
            'author_name': forms.TextInput(attrs={'placeholder': "Enter book's author", 'required': True, 'class': 'input', 'id':'author'}),
            'describtion': forms.Textarea(attrs={'placeholder': "Write the book's description", 'required': True, 'id': 'des'}),
            'category': forms.Select(choices=Book.category_options, attrs={'id':'book'}),
            'cover': forms.FileInput(attrs={'accept': 'image/*', 'class': 'inpfile'})
        }