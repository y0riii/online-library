from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.template import loader
from django.http import HttpResponse
from django.contrib.auth.models import User
from . import forms


# Create your views here.
@login_required(login_url='login')
def home(request):
    return render(request, 'home.html')

def login_page(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
        else:
            messages.error(request, 'something went wrong')
        return redirect('home')
    
    return render(request, 'login.html')
    
def register_page(request):
    form = forms.RegisterationForm()
    if request.method == 'POST':
        form = forms.RegisterationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            users = User.objects.all()
            return redirect('home')
    context = {'form': form}
    return render(request, 'register.html', context)