// Utility functions

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength (min 6 characters)
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Get error message from Firebase error
export const getFirebaseErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Bu email zaten kullanılıyor',
    'auth/invalid-email': 'Geçersiz email adresi',
    'auth/operation-not-allowed': 'İşlem izin verilmiyor',
    'auth/weak-password': 'Şifre çok zayıf',
    'auth/user-disabled': 'Kullanıcı devre dışı bırakıldı',
    'auth/user-not-found': 'Kullanıcı bulunamadı',
    'auth/wrong-password': 'Yanlış şifre',
    'auth/invalid-credential': 'Geçersiz kimlik bilgileri',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin',
    'auth/network-request-failed': 'Ağ hatası. İnternet bağlantınızı kontrol edin',
  };
  
  return errorMessages[errorCode] || 'Bir hata oluştu';
};

// Format date
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
