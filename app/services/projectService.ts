import { db } from '@/firebase';
import type { IProject } from '@/types/types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc
} from 'firebase/firestore';

export const projectService = {
  getProjectLikes: async (): Promise<IProject[]> => {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        likes: doc.data().likes as number
      }));
    } catch (error) {
      console.error('Error fetching project likes:', error);
      // Handle the error appropriately, e.g., return an empty array or throw
      throw error;
    }
  },

  incrementProjectLike: async (id: string): Promise<IProject | null> => {
    const docRef = doc(db, 'projects', id);

    await updateDoc(docRef, {
      likes: increment(1)
    });

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      likes: snapshot.data().likes as number
    };
  },

  decrementProjectLike: async (id: string): Promise<IProject | null> => {
    const docRef = doc(db, 'projects', id);

    await updateDoc(docRef, {
      likes: increment(-1)
    });

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      likes: snapshot.data().likes as number
    };
  }
};
