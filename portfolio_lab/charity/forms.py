from django import forms


class MyUserChangeForm(forms.Form):
    first_name = forms.CharField(label='Imię', max_length=64, min_length=2)
    last_name = forms.CharField(label='Nazwisko', max_length=128, min_length=2)
    password = forms.CharField(max_length=50, label='Wprowadź swoje hasło aby potwierdzić zmiany',
                               widget=forms.PasswordInput)
