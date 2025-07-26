exports.calculateInterest = (P, N, R) => (P * N * R) / 100
exports.calculateEMI = (A, N) => Math.ceil(A / (N * 12))
