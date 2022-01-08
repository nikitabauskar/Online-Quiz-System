from rest_framework import serializers
from .models import Question,Quiz, Choice

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

        
class QuizSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ('__all__')

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data
        print(data)
        quiz = Quiz()
        quiz.title = data['title']
        quiz.time = data['time']
        quiz.total_marks = data['total_marks']
        quiz.save()
        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.save()
            for c in q['choices']:
                getC, created = Choice.objects.get_or_create(title=c)
                if created:
                    getC = Choice.objects.get(title=c)
                    newQ.choices.add(getC)
                else:
                    newQ.choices.add(getC)

            newQ.answer = Choice.objects.get(title=q['answer'])
            newQ.quiz = quiz
            newQ.save()
            order += 1
        print(quiz)

        return quiz


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)
    answer = StringSerializer(many=False)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order', 'answer')


class QuizListSerializer (serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'title', 'created_date','time',)