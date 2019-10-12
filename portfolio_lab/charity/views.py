from django.shortcuts import render

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


class Register(View):
    def get(self, request):
        return render(request, 'charity/register.html')
