import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map, of, tap } from 'rxjs';
import { StorageHelper } from 'src/app/shared/services/storage/storage-helper.util';
import { JapaneseScript } from '../../../shared/models/japanese-script';
import { Score } from '../models/score.type';
import { KanasScores } from '../models/kana-score.type';
import { kanaScoreConverter, playerScoreConverter } from '../utils/firestore-converters.utils';

@Injectable({ providedIn: 'root' })
export class QuizScoreClientService {
  constructor(private firestore: Firestore) {}

  readonly mainCollection = collection(this.firestore, 'users');

  fetchKanaScores(script: JapaneseScript): Observable<KanasScores | undefined> {
    const userId = this.getUserId();

    return from(getDoc(doc(this.mainCollection, `${userId}/scores/${script}`).withConverter(kanaScoreConverter))).pipe(
      map((data) => data.data()),
      tap((data) => console.log('>>>>>>>>>>>>>> getKanaScores', data))
    );
  }

  fetchPlayerScore(): Observable<Score | undefined> {
    const userId = StorageHelper.getItem<string>('userId');

    return from(getDoc(doc(this.mainCollection, `${userId}/scores/player`).withConverter(playerScoreConverter))).pipe(
      map((data) => data.data()),
      tap((data) => console.log('>>>>>>>>>>>>>>  getPlayerScores', data))
    );
  }

  updateKanaScore(kanaScore: KanasScores, japaneseScript: JapaneseScript): Observable<unknown> {
    const userId = this.getUserId();

    return from(
      setDoc(
        doc(this.mainCollection, `${userId}/scores/${japaneseScript}`).withConverter(kanaScoreConverter),
        kanaScore
      )
    );
  }

  updatePlayerScore(score: Score): Observable<unknown> {
    const userId = this.getUserId();

    return from(setDoc(doc(this.mainCollection, `${userId}/scores/player`).withConverter(playerScoreConverter), score));
  }

  private getUserId(): string {
    return StorageHelper.getItem<string>('userId');
  }
}
