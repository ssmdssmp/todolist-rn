export interface ITask {
  isDone: boolean;
  title: string;
  creationDate: string;
  id?: string;
}

export type FirebaseUser = {
  displayName: string | null;
  email: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: {
    creationTime: number;
    lastSignInTime: number;
  };
  multiFactor?: {
    enrolledFactors: any[];
  };
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerData?: {
    providerId: string;
    uid: string;
  }[];
  providerId?: string;
  refreshToken?: string;
  tenantId?: string | null;
  uid: string;
};
