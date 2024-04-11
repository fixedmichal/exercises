import { QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { KanasScores } from '../models/kana-score.type';
import { Score } from '../models/score.type';

export const kanaScoreConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return data as KanasScores;
  },
  toFirestore: (data: KanasScores) => data,
};

export const playerScoreConverter = {
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return data as Score;
  },
  toFirestore: (data: Score) => data,
};
