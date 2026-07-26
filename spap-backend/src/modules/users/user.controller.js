// =============================================
// User Controller
// Handles HTTP requests for user module
// =============================================

const userService = require("./user.service");

const asyncHandler = require("../../shared/utils/asyncHandler");
const response = require("../../shared/responses/response");

const {
    HTTP_STATUS,
    MESSAGES,
} = require("../../shared/constants");

// =============================================
// Create User
// =============================================
const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    return response.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.USER_CREATED,
        user
    );
});

// =============================================
// Get Users
// =============================================
const getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getUsers(req.query);

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USERS_FETCHED,
        users
    );
});

// =============================================
// Get User By ID
// =============================================
const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USER_FETCHED,
        user
    );
});

// =============================================
// Update User
// =============================================
const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(
        req.params.id,
        req.body
    );

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USER_UPDATED,
        user
    );
});

// =============================================
// Update User Status
// =============================================
const updateUserStatus = asyncHandler(async (req, res) => {
    const user = await userService.updateUserStatus(
        req.params.id,
        req.body.status
    );

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USER_STATUS_UPDATED,
        user
    );
});

// =============================================
// Verify User
// =============================================
const verifyUser = asyncHandler(async (req, res) => {
    const user = await userService.verifyUser(req.params.id);

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USER_VERIFIED,
        user
    );
});

// =============================================
// Delete User
// =============================================
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);

    return response.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.USER_DELETED,
        user
    );
});

// =============================================
// Exports
// =============================================
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    updateUserStatus,
    verifyUser,
    deleteUser,
};