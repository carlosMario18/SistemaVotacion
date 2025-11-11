from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Vote, Options
# Create your tests here.


class VoteApiTestCase(APITestCase):
    
    def test_create_votes(self):
        # Encuesta
        data = {
            "title": "Lenguaje favorito",
            "options": [{"text": "Python"}, {"text": "JavaScript"}]
        }
        response = self.client.post('/polls/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        vote_id = response.data["id"]
        option_id = response.data["options"][0]["id"]
        
        # Emitir voto
        vote_response = self.client.post(
            f"/polls/{vote_id}/vote/",
            {"option_id": option_id},
            format='json'
        )
        self.assertEqual(vote_response.status_code, status.HTTP_200_OK)
        self.assertEqual(vote_response.data["message"], "Voto registrado con éxito")

        # Verificar conteo 
        detail_response = self.client.get(f"/polls/{vote_id}/")
        self.assertEqual(detail_response.status_code, status.HTTP_200_OK)

        options = detail_response.data["options"]
        voted_option = next(opt for opt in options if opt["id"] == option_id)
        self.assertEqual(voted_option["votes"], 1)