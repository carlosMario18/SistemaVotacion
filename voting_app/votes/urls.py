from django.urls import path
from .views import VoteDetailView, VoteListCreateView, VoteView

urlpatterns = [
    path('', VoteListCreateView.as_view(), name='polls-list-create'),
    path('<int:pk>/', VoteDetailView.as_view(), name='poll-detail'),
    path('<int:pk>/vote/', VoteView.as_view(), name='poll-vote'),
]
