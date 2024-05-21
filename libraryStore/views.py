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
from django.db.models import Q

User = get_user_model()

# Create your views here.
@login_required(login_url='login')
def home(request):
    books = Book.objects.all()
    book_list = []
    for i in range(len(books)):
        book = books[i]
        if len(book.title) > 14:
            book.title = book.title[:12] + ".."
        if len(book.author_name) > 14:
            book.author_name = book.author_name[:12] + ".."
        own = ""
        if book.owner != None:
            own = book.owner.username
        book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'is_available': book.is_available,
                'cover': book.cover.url,
                'owner': own,
            })
    
    context = {'books': book_list, 'name': request.user.username}
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
            messages.error(request, 'Email is not correct')
            return render(request, 'login.html')
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Password is not correct')
    
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
    books = Book.objects.all()
    book_list = []
    for book in books:
        if book.owner == request.user:
            if len(book.title) > 14:
                book.title = book.title[:12] + ".."
            if len(book.author_name) > 14:
                book.author_name = book.author_name[:12] + ".."
            book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'is_available': book.is_available,
                'cover': book.cover.url,
            })
    context = {'books': book_list}
    return render(request, 'my-books.html', context)

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
        if (request.FILES.get('inpfile')):
            book.cover = request.FILES.get('inpfile')
        print(book.cover)
        book.save()
        return redirect('home')
    return render(request, 'add-new-book.html', context)


@login_required(login_url='login')
def book_details(request, pk):
    book = Book.objects.get(id=int(pk))
    own = ""
    if book.owner != None:
        own = book.owner.username
    b = {
        'id': book.id,
        'title': book.title,
        'author_name': book.author_name,
        'category': book.category,
        'is_available': book.is_available,
        'cover': book.cover.url,
        'describtion': book.describtion,
        'owner': own,
    }
    context = {'book': b}
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
        q_objects = Q()
        if title != '':
            q_objects = Q(title__icontains=title) | Q(author_name__icontains=title)
        if category != 'all':
            q_objects &= Q(category=category)
        if ava:
            q_objects &= Q(is_available=True)
        books = Book.objects.filter(q_objects)
        book_list = []
        for book in books:
            own = ""
            if book.owner != None:
                own = book.owner.username
            book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'available': book.is_available,
                'cover': book.cover.url,
                'owner':own,
            })
        book_list = json.dumps({'books': book_list})
        return JsonResponse(book_list, safe=False)

def searchMyBooks(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        books = Book.objects.all()
        title = data['title']
        category = data['category']
        q_objects = Q()
        if request.user:
            q_objects = Q(owner=request.user)
        if title != '':
            q_objects &= Q(title__icontains=title) | Q(author_name__icontains=title)
        if category != 'all':
            q_objects &= Q(category=category)
        books = Book.objects.filter(q_objects)
        book_list = []
        for book in books:
            book_list.append({
                'id': book.id,
                'title': book.title,
                'author_name': book.author_name,
                'category': book.category,
                'available': book.is_available,
                'cover': book.cover.url,
            })
        book_list = json.dumps({'books': book_list})
        return JsonResponse(book_list, safe=False)

def borrow_book(request, pk):
    book = Book.objects.get(id=pk)
    if book.is_available:
        book.is_available = False
        book.owner = request.user
        book.save()
        return redirect('home')
    return redirect('book-details', pk)

def return_book(request, pk):
    book = Book.objects.get(id=pk)
    if not book.is_available and book.owner == request.user:
        book.is_available = True
        book.owner = None
        book.save()
    return redirect('home')