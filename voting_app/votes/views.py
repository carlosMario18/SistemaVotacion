from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Vote, Options
from .serializers import VoteSerializer, OptionsSerializer


# views

class VoteListCreateView(generics.ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    
class VoteDetailView(generics.RetrieveAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    
class VoteView(generics.GenericAPIView):
    serializer_class = VoteSerializer
    
    def post(self, request, pk):
        option_id = request.data.get('option_id')
        if not option_id:
            return Response({"error": "Debe enviar el campo option_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            option = Options.objects.get(id=option_id, vote__id=pk)
        except Options.DoesNotExist:
            return Response({"error": "Opción no encontrada para esta encuesta"}, status=status.HTTP_404_NOT_FOUND)

        option.votes += 1
        option.save()

        return Response(
            {"message": "Voto registrado con éxito", "option": option.text, "votes": option.votes},
            status=status.HTTP_200_OK
        )


