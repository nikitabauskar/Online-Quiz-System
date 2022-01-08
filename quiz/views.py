from django.shortcuts import render
from .serializers import QuizListSerializer, QuizSerializer
from .models import Quiz
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK
)
# Create your views here.
class QuizListAPIView (ListAPIView):
    serializer_class = QuizListSerializer
    queryset = Quiz.objects.all()

class QuizRetrieveAPIView (RetrieveAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

class QuizCreateAPIView (CreateAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            quiz = serializer.create(request)
            if quiz:
                return Response(data={"data": quiz.id}, status=HTTP_201_CREATED)
        print(serializer.error)
        return Response(status=HTTP_400_BAD_REQUEST)