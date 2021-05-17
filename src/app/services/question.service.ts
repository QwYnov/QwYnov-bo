import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  listQuestions() {
    let questions = [];
    this.firestore.collection('questions').get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          questions.push({question: doc.data(), id: doc.id});
        })
      }
    );
    return questions;
  }

  createQuestion(question){
    this.firestore.collection('questions').add(question);
  }

  updateQuestion(question, id){
    this.firestore.collection('questions').doc(id).update(question);
  }

  deleteQuestion(id){
    this.firestore.collection('questions').doc(id).delete();
  }
}
