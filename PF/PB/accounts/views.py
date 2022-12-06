from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import CustomUser, PaymentTransaction, Subscription
from .serializers import RegistrationSerializer, ChangePasswordSerializer, UpdateUserSerializer, \
    AddSubscriptionSerializer, UpdateSubscriptionSerializer, CancelSubscriptionSerializer, PaymentTransactionSerializer
from .serializers import  UpdateCardInfoSerializer
from PB.paginations import CustomPagination

class RegistrationView(APIView):

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)


class ChangePasswordView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user


class UpdateProfileView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class AddSubscriptionView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = AddSubscriptionSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user


class UpdateCardInfoView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateCardInfoSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user

class UpdateSubscriptionView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateSubscriptionSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user

class CancelSubscriptionView(UpdateAPIView):

    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CancelSubscriptionSerializer

    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.request.user.id)
        return user


class ListPaymentHistoryView(ListAPIView):
    model = PaymentTransaction
    pagination_class = CustomPagination
    serializer_class = PaymentTransactionSerializer

    def get_queryset(self):
        request = self.request
        user = request.user
        payment_history = list(PaymentTransaction.objects.filter(user=user).values())
        amount = None
        plan = None
        if user.is_subscribed:
            if str(user.subscription.duration) == "Monthly":
                amount = Subscription.objects.filter(duration="Monthly").values("amount")[0].get("amount")
                plan = "Monthly"
            elif str(user.subscription.duration) == "Weekly":
                plan = "Weekly"
                amount = Subscription.objects.filter(duration="Weekly").values("amount")[0].get("amount")
            elif str(user.subscription.duration) == "Bi-weekly":
                plan = "Bi-weekly"
                amount = Subscription.objects.filter(duration="Bi-weekly").values("amount")[0].get("amount")
            elif str(user.subscription.duration) == "Yearly":
                plan = "Yearly"
                amount = Subscription.objects.filter(duration="Yearly").values("amount")[0].get("amount")
        if amount is not None:
            payment_history.append({"id": "0",
                                    "userid": user.id,
                                    "amount": amount,
                                    "date": user.next_payment_date,
                                    "card_info": user.card_info,
                                    "recurrence": plan})
        return payment_history