from django.urls import path
from . import views

urlpatterns = [
    path("dishes/<str:val>/", views.DishListCreate.as_view(), name="dish-list"),
    path("dishes/delete/<int:pk>/", views.DishDelete.as_view(), name="delete-dish")
]
 