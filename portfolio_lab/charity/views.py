from django.shortcuts import render

from django.views import View

from charity.models import Donation


class LandingPage(View):
    def get(self, request):
        donations = Donation.objects.all()
        number_of_bags = [donation.quantity for donation in donations]
        number_of_institutions = list(set([donation.institution for donation in donations]))
        ctx = {'number_of_bags': sum(number_of_bags),
               'number_of_institutions': len(number_of_institutions)}
        return render(request, 'charity/index.html', ctx)


class AddDonation(View):
    def get(self, request):
        return render(request, 'charity/form.html')


class Login(View):
    def get(self, request):
        return render(request, 'charity/login.html')


class Register(View):
    def get(self, request):
        return render(request, 'charity/register.html')
