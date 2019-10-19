from datetime import date

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator

from django.views import View

from charity.models import Donation, Institution, Category

today = str(date.today())


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

    @method_decorator(login_required)
    def get(self, request):
        categories = Category.objects.all()
        institutions = Institution.objects.all()
        ctx = {'categories': categories,
               'institutions': institutions,
               'today': today}
        return render(request, 'charity/form.html', ctx)

    def post(self, request):
        quantity = int(request.POST.get('bags'))
        checked_categories = request.POST.getlist('categories')
        categories = []
        for i in checked_categories:
            categories.append(Category.objects.get(id=i))

        institution = request.POST.get('organization')
        address = request.POST.get('address')
        phone_number = request.POST.get('phone')
        city = request.POST.get('city')
        zip_code = request.POST.get('postcode')
        pick_up_date = request.POST.get('data')
        pick_up_time = request.POST.get('time')
        pick_up_comment = request.POST.get('more_info')
        user = request.user.id

        donation = Donation.objects.create(quantity=quantity, institution_id=institution, address=address,
                                           phone_number=phone_number, city=city, zip_code=zip_code,
                                           pick_up_date=pick_up_date, pick_up_time=pick_up_time,
                                           pick_up_comment=pick_up_comment, user_id=user)
        donation.categories.set(categories)
        donation.save()
        return redirect('form-confirm')


class AddDonationFormConfirm(View):

    def get(self, request):
        return render(request, 'charity/form-confirmation.html')


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
        email = request.POST.get('email')
        if len(request.POST.get('password')) >= 8 and (request.POST.get('password') == request.POST.get('password2')):
            password = request.POST.get('password')
            User.objects.create_user(username=username,
                                     email=email,
                                     first_name=first_name,
                                     last_name=last_name,
                                     password=password)
            return redirect('login')
        elif len(request.POST.get('password')) < 8:
            info_1 = 'Hasło jest za krótkie, powinno mieć min. 8 znaków.'
            return render(request, 'charity/register.html', {'info_1': info_1})
        else:
            info_2 = 'Hasło inne niż wpisane wcześniej, spróbuj ponownie.'
            return render(request, 'charity/register.html', {'info_2': info_2})


class Logout(View):

    def get(self, request):
        logout(request)
        return redirect('landing-page')


class UserDetailsView(View):

    @method_decorator(login_required)
    def get(self, request):
        return render(request, 'charity/user-details.html')
