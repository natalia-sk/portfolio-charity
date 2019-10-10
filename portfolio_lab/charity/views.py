from django.shortcuts import render

# Create your views here.
from django.views import View


class LandingPage(View):
    def get(self, request):
        return render(request, 'charity/index.html')


class AddDonation(View):
    def get(self, request):
        return render(request, 'charity/form.html')


class Login(View):
    def get(self, request):
        return render(request, 'charity/login.html')


class Register(View):
    def get(self, request):
        return render(request, 'charity/register.html')
