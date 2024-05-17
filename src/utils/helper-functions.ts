function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
}

export { isValidEmail };