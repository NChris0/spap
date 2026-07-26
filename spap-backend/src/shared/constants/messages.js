// =============================================
// System Messages
// Shared success and error messages
// =============================================

const MESSAGES = {
    // =========================================
    // Generic
    // =========================================
    CREATED: "Resource created successfully.",
    UPDATED: "Resource updated successfully.",
    FETCHED: "Resource retrieved successfully.",
    DELETED: "Resource deleted successfully.",
    LIST_FETCHED: "Resources retrieved successfully.",
    STATUS_UPDATED: "Status updated successfully.",
    VERIFIED: "Resource verified successfully.",

    // =========================================
    // User
    // =========================================
    USER_CREATED: "User created successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_FETCHED: "User retrieved successfully.",
    USERS_FETCHED: "Users retrieved successfully.",
    USER_DELETED: "User deleted successfully.",
    USER_VERIFIED: "User verified successfully.",
    USER_STATUS_UPDATED: "User status updated successfully.",

    // =========================================
    // Role
    // =========================================
    ROLE_CREATED: "Role created successfully.",
    ROLE_UPDATED: "Role updated successfully.",
    ROLE_FETCHED: "Role retrieved successfully.",
    ROLES_FETCHED: "Roles retrieved successfully.",
    ROLE_DELETED: "Role deleted successfully.",

    // =========================================
    // Club
    // =========================================
    CLUB_CREATED: "Club created successfully.",
    CLUB_UPDATED: "Club updated successfully.",
    CLUB_FETCHED: "Club retrieved successfully.",
    CLUBS_FETCHED: "Clubs retrieved successfully.",
    CLUB_DELETED: "Club deleted successfully.",

    // =========================================
    // Authentication
    // =========================================
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",
    PASSWORD_CHANGED: "Password changed successfully.",
    PASSWORD_RESET: "Password reset successfully.",
    TOKEN_REFRESHED: "Access token refreshed successfully.",
    EMAIL_VERIFIED: "Email verified successfully.",
    OTP_VERIFIED: "OTP verified successfully.",

    // =========================================
    // Validation / Errors
    // =========================================
    INVALID_CREDENTIALS: "Invalid email or password.",
    ACCESS_DENIED: "Access denied.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "You do not have permission to perform this action.",
    NOT_FOUND: "Requested resource not found.",
    VALIDATION_FAILED: "Validation failed.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
};

module.exports = MESSAGES;