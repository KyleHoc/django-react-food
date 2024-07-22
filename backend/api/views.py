from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DishSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Dish

#View for creating a new dish
class DishListCreate(generics.ListCreateAPIView):
    #Set the serializer_class to DishSerializer and only grant authenticated users permission to access this view
    serializer_class = DishSerializer
    permission_class = [IsAuthenticated]
    
    #Function for returning dishes created by the user
    def get_queryset(self):
        user = self.request.user
        value = (self.kwargs['val'])
        print(value)
        if value == "user":
            return Dish.objects.filter(author=user)
        else: 
            return Dish.objects.all()

    
    #Function for creating dishes
    def perform_create(self, serializer):
        #If the serializer is valid, save the dish and set author as the user
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            #Otherwise, print errors
            print(serializer.errors)

class DishDelete(generics.DestroyAPIView):
    serializer_class = DishSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Dish.objects.filter(author=user)
    
    
#View for creating a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
