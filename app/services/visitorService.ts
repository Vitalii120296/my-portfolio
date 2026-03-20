import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useMutation, useQuery } from '@tanstack/react-query';

export const visitorService = {
  incrementVisitors: async () => {
    const hasVisited = localStorage.getItem('visited');

    if (!hasVisited) {
      localStorage.setItem('visited', 'true');

      try {
        await updateDoc(doc(db, 'stats', 'visitors'), {
          count: increment(1)
        });
      } catch (error) {
        console.error('Error incrementing visitors:', error);
      }
    }
  },

  getLikesCount: async (): Promise<number> => {
    const docRef = doc(db, 'stats', 'visitors');

    try {
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        return snapshot.data().likes ?? 0;
      }

      return 0;
    } catch (error) {
      console.log(error);
      return 0;
    }
  },

  incrementLikes: async () => {
    try {
      await updateDoc(doc(db, 'stats', 'visitors'), {
        likes: increment(1)
      });

      localStorage.setItem('portfolio_like', 'true');
    } catch (error) {
      console.error('Error incrementing likes:', error);
    }
  },

  decrementLikes: async () => {
    try {
      await updateDoc(doc(db, 'stats', 'visitors'), {
        likes: increment(-1)
      });

      localStorage.setItem('portfolio_like', 'false');
    } catch (error) {
      console.error('Error incrementing likes:', error);
    }
  }
};
