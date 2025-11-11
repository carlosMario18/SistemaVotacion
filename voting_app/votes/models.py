from django.db import models

# models
class Vote(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)    

    def __str__(self):
        return self.candidate_name
    
class Options(models.Model):
    vote = models.ForeignKey(Vote, on_delete=models.CASCADE, related_name='options')
    text = models.CharField(max_length=255)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.option_text