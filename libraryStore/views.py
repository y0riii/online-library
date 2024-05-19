from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.template import loader
from django.http import HttpResponse
from django.http import JsonResponse
from .models import User, Book
from . import forms
from django.contrib.auth import get_user_model
import json

User = get_user_model()

# Create your views here.
@login_required(login_url='login')
def home(request):
    context = {'books': Book.objects.all(), 'name': request.user.username}
    return render(request, 'home.html', context)

def login_page(request):
    if (request.user.is_authenticated):
        return redirect('home')
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            user = User.objects.get(email=email)
        except:
            messages.error(request, 'user not found')
            return render(request, 'login.html')
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'something went wrong')
    
    return render(request, 'login.html')
    
def register_page(request):
    if (request.user.is_authenticated):
        return redirect('home')
    form = forms.RegisterationForm()
    if request.method == 'POST':
        form = forms.RegisterationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
    context = {'form': form}
    return render(request, 'register.html', context)

def logout_page(request):
    logout(request)
    return redirect('login')

def about_us(request):
    return render(request, 'about-us.html')

@login_required(login_url='login')
def my_books(request):
    if request.user.is_staff:
        return redirect("/")
    return render(request, 'my-books.html')

@login_required(login_url='login')
def add_new_book(request):
    if not request.user.is_staff:
        return redirect("/")
    form = forms.BookForm()
    context = {'heading': 'Add Book Form',
               'btnName': 'Add Book',
               'coverTitle': "Click to add book's cover",
               'form': form,
               'category_options': Book.category_options
               }
    if request.method == 'POST':
        form = forms.BookForm(request.POST, request.FILES)
        context['form'] = form
        if form.is_valid():
            book = form.save(commit=False)
            book.is_available = True
            book.owner = None
            book.save()
            return redirect('home')
    if request.method == 'POST':
        form = forms.BookForm(request.POST, request.FILES)
        context['form'] = form
        if form.is_valid():
            book = form.save(commit=False)
            book.is_available = True
            book.owner = None
            book.save()
            return redirect('home')
    return render(request, 'add-new-book.html', context)

@login_required(login_url='login')
def edit_book(request, pk):
    book = Book.objects.get(id=int(pk))
    context = {'heading': 'Edit Book Form',
               'btnName': 'Edit Book',
               'coverTitle': "Click to edit book's cover",
               'book': book,
               'category_options': Book.category_options}
    if request.method == 'POST':
        form = request.POST
        if form.get('name'):
            book.title = form.get('name')
        if form.get('author'):
            book.author_name = form.get('author')
        if form.get('des'):
            book.describtion = form.get('des')
        if (form.get('book')):
            book.category = form.get('book')
        if (form.get('inpfile')):
            book.cover = form.get('inpfile')
        book.save()
        return redirect('home')
    return render(request, 'add-new-book.html', context)


@login_required(login_url='login')
def book_details(request, pk):
    book = Book.objects.get(id=int(pk))
    context = {'book': book}
    return render(request, 'book-details.html', context)

def delete_book(request, pk):
    book = Book.objects.get(id=int(pk))
    book.delete()
    return redirect('home')

def searchBooks(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        books = Book.objects.all()
        title = data['title']
        category = data['category']
        ava = data['available']
        if title != '':
            books = books.filter(title__icontains=title)
        if category != 'all':
            books = books.filter(category=category)
        if ava == 'true':
            books = books.filter(is_available=True)
        book_list = []
        for book in books:
            book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'available': book.is_available,
                'cover': book.cover.url,
                'owner':book.owner,
            })
        book_list = json.dumps({'books': book_list})
        return JsonResponse(book_list, safe=False)

def searchMyBooks(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        books = Book.objects.all()
        title = data['title']
        category = data['category']
        ava = data['available']
        if request.user:
            books = books.filter(owner=request.user)
        if title != '':
            books = books.filter(title__icontains=title)
        if category != 'all':
            books = books.filter(category=category)
        if ava == 'true':
            books = books.filter(is_available=True)
        book_list = []
        for book in books:
            book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'available': book.is_available,
                'cover': book.cover.url,
                'owner':book.owner,
            })
        book_list = json.dumps({'books': book_list})
        return JsonResponse(book_list, safe=False)

def borrow_book(request, pk):
    book = Book.objects.get(id=pk)
    if book.is_available:
        book.is_available = False
        book.owner = request.user.username
        book.save()
        return redirect('home')
    return redirect('book-details', pk)

def return_book(request, pk):
    book = Book.objects.get(id=pk)
    print(book.is_available)
    if not book.is_available and book.owner == request.user.username:
        book.is_available = True
        book.owner = None
        print('hi')
        book.save()
        print('a7a')
        return redirect('home')
    return redirect('book-return', pk)