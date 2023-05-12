package com.example.restservice;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

@RestController
public class GitHubController {
	@PostMapping("/github/repos")
	public List<String> getUserRepos(HttpSession httpSession) {
		String accessToken = (String) httpSession.getAttribute("accessToken");

		if (accessToken != null) {
			String githubReposUrl = "https://api.github.com/user/repos";

			RestTemplate restTemplate = new RestTemplate();
			String[] repos = restTemplate.getForObject(githubReposUrl, String[].class);

			if (repos != null) {
				return Arrays.asList(repos);
			}
		}

		return null;
	}
}