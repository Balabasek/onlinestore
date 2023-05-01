package com.example.service;

import com.example.dtos.user.ChangeUserPasswordDto;
import com.example.dtos.user.CreateUserDto;
import com.example.dtos.user.DeleteUserDto;
import com.example.model.User;
import com.example.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createNewUser(CreateUserDto createUserDto) {
        User user = new User(createUserDto.getFirstName(), createUserDto.getMiddleName(),
                createUserDto.getSecondName(), createUserDto.getLogin(), createUserDto.getPassword());

        if (userRepository.existsDistinctByPassword(user.getPassword())) {
            System.out.println("Password already exists, try again");
            return null;
        }

        return userRepository.save(user);
    }

    public String changePassword(ChangeUserPasswordDto changeUserPasswordDto) {
        User user = userRepository.findUserById(changeUserPasswordDto.getId());
        if (user != null) {
            if (user.getPassword().equals(changeUserPasswordDto.getNewPassword())) {
                return "New password equals old password";
            } else {
                user.setPassword(changeUserPasswordDto.getNewPassword());
            }
        } else {
            return "User " + changeUserPasswordDto.getId() + " not found!";
        }
        return "OK!";
    }

    public User deleteUser(DeleteUserDto deleteUserDto) {
        User user = userRepository.deleteUsersById(deleteUserDto.getId());
        System.out.println("User " + user.getFirstName() + user.getSecondName() + user.getMiddleName() + " deleted");

        return user;
    }
}
