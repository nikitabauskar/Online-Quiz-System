from django.db import models

# Create your models here.
class Quiz(models.Model):
    title = models.CharField(max_length=50)
    time = models.IntegerField()
    created_date = models.DateField(auto_now_add=True)
    total_marks = models.PositiveIntegerField()

    def __str__(self):
        return self.title


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name='answer', blank=True, null=True)
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE,  related_name='questions', blank=True, null=True)
    order = models.SmallIntegerField()

    def __str__(self):
        return self.question