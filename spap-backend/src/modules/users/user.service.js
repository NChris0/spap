// =============================================
// User Service
// Handles user business logic
// =============================================

const User = require("./user.model");
const Role = require("../roles/role.model");
const Club = require("../clubs/club.model");

const { STATUS } = require("../../shared/constants");

const ApiError = require("../../shared/errors/ApiError");

// =============================================
// Create User
// =============================================
const createUser = async (data) => {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        throw new ApiError(409, "Email already exists");
    }

    const role = await Role.findById(data.role);

    if (!role) {
        throw new ApiError(404, "Role not found");
    }

    if (data.club) {
        const club = await Club.findById(data.club);

        if (!club) {
            throw new ApiError(404, "Club not found");
        }
    }

    const user = await User.create(data);

    return await User.findById(user._id)
        .populate("role")
        .populate("club");
};

// =============================================
// Get Users
// =============================================
const getUsers = async (filters = {}) => {
    const query = {};

    if (filters.club) {
        query.club = filters.club;
    }

    if (filters.role) {
        query.role = filters.role;
    }

    if (filters.status) {
        query.status = filters.status;
    }

    return await User.find(query)
        .populate("role")
        .populate("club")
        .sort({ createdAt: -1 });
};

// =============================================
// Get User By ID
// =============================================
const getUserById = async (id) => {
    const user = await User.findById(id)
        .populate("role")
        .populate("club");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

// =============================================
// Get User By Email
// Used by Auth Module
// =============================================
const getUserByEmail = async (email) => {
    return await User.findOne({ email })
        .select("+password")
        .populate("role")
        .populate("club");
};

// =============================================
// Update User
// =============================================
const updateUser = async (id, data) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    delete data.password;
    delete data.isVerified;

    if (data.role) {
        const role = await Role.findById(data.role);

        if (!role) {
            throw new ApiError(404, "Role not found");
        }
    }

    if (data.club) {
        const club = await Club.findById(data.club);

        if (!club) {
            throw new ApiError(404, "Club not found");
        }
    }

    Object.assign(user, data);

    await user.save();

    return await User.findById(user._id)
        .populate("role")
        .populate("club");
};

// =============================================
// Update User Status
// =============================================
const updateUserStatus = async (id, status) => {
    if (!Object.values(STATUS).includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.status = status;

    await user.save();

    return user;
};

// =============================================
// Verify User
// =============================================
const verifyUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.isVerified = true;

    await user.save();

    return user;
};

// =============================================
// Soft Delete User
// =============================================
const deleteUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.status = STATUS.DELETED;

    await user.save();

    return user;
};

// =============================================
// Exports
// =============================================
module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    updateUserStatus,
    verifyUser,
    deleteUser,
};