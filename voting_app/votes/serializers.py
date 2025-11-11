from rest_framework import serializers
from .models import Vote, Options

class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = ['id', 'text', 'votes']
        
class VoteSerializer(serializers.ModelSerializer):
    options = OptionsSerializer(many=True)
    
    class Meta:
        model = Vote
        fields = ['id', 'title', 'options']
        
    def create(self, validated_data):
        options_data = validated_data.pop('options')
        vote = Vote.objects.create(**validated_data)
        for option_data in options_data:
            Options.objects.create(vote=vote, **option_data)
        return vote