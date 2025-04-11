import crypto from "crypto";
import hashService from "./hash-service.js";

class OtpService {
  generateOtp() {
    return crypto.randomInt(1000, 9999);
  }

  sendOtpBySMS(phone, otp) {}

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

export default new OtpService();
