import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    
    const {fullName , email , username , password} = req.body
    console.log("email",email)

    // if (
    //     [fullName, email, username, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

    if (fullName === ""){
        throw new ApiError( 400 , "fullname is required ");
    }

    if (email === ""){
        throw new ApiError( 400 , "email is required ");
    }

    if (password === ""){
        throw new ApiError( 400 , "password is required ");
    }

    if (username === ""){
        throw new ApiError( 400 , "username is required ");
    }

    const existedUser = User.findOne({
        $or : [{ email } , { password }]
    })

    if (existedUser) {
        throw new ApiError( 409 , "Username or email already existed ");
        
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError( 400 , "avtar should not be empty ");
    }
    
    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if (!avtar) {
        throw new ApiError( 400 , "avtar should not be empty ");        
    }

    const user = await User.create({
        fullName,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password

    })

    const createdUser = await User.findById(user._id).select(
        "- password -refreshToken"//------->(- jiske aage aata h wwo nhi chaiye iska mtlb hota hai)<-------------
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while creating/registering the user");        
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "user registered successfully")
    )


})

export {registerUser}