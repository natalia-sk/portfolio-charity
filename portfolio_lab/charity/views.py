from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect

from django.views import View

from charity.models import Donation, Institution


class LandingPage(View):

    def get(self, request):
        donations = Donation.objects.all()
        number_of_bags = [donation.quantity for donation in donations]
        number_of_institutions = list(set([donation.institution for donation in donations]))
        institutions_f = Institution.objects.filter(type_of=1)
        institutions_o = Institution.objects.filter(type_of=2)
        institutions_l = Institution.objects.filter(type_of=3)
        ctx = {'number_of_bags': sum(number_of_bags),
               'number_of_institutions': len(number_of_institutions),
               'institutions_f': institutions_f,
               'institutions_o': institutions_o,
               'institutions_l': institutions_l,
               }
        return render(request, 'charity/index.html', ctx)


class AddDonation(View):

    def get(self, request):
        return render(request, 'charity/form.html')


class Login(View):

    def get(self, request):
        return render(request, 'charity/login.html')

    def post(self, request):
        username = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('landing-page')
        return redirect('register')


class Register(View):

    def get(self, request):
        return render(request, 'charity/register.html')

    def post(self, request):
        first_name = request.POST.get('name')
        last_name = request.POST.get('surname')
        username = request.POST.get('email')
        if request.POST.get('password') == request.POST.get('password2'):
            password = request.POST.get('password')
            User.objects.create_user(username=username,
                                     first_name=first_name,
                                     last_name=last_name,
                                     password=password)
            return redirect('login')
        else:
            info = 'Hasło inne niż wpisane wcześniej, spróbuj ponownie.'
            return render(request, 'charity/register.html', {'info': info})
