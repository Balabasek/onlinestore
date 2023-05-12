package com.example.restservice;

import com.example.model.Session;
import com.example.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@CrossOrigin
public class OAuthController {
	@Value("${github.client.clientId}")
	private String clientId;

	@Value("${github.client.clientSecret}")
	private String clientSecret;

	@Value("${github.client.redirectUri}")
	private String redirectUri;

	@Autowired
	private SessionService sessionService;

	@GetMapping("/login/github")
	public String redirectToGitHub() {

		return "https://github.com/login/oauth/authorize" +
				"?client_id=" + clientId +
				"&redirect_uri=" + redirectUri;
	}

	@GetMapping("/login/github/callback")
	public String handleGitHubCallback(@RequestParam("code") String code) {
		Session activeSession = initSession(code);

		if ("Save success".equals(sessionService.saveSession(activeSession))) {
			return activeSession.getCodeToken();
		} else {
			return "Error occurred while save session";
		}
	}

	private Session initSession(String code) {
		String githubAccessTokenUrl = "https://github.com/login/oauth/access_token" +
				"?client_id=" + clientId +
				"&client_secret=" + clientSecret +
				"&code=" + code +
				"&redirect_uri=" + redirectUri;

		RestTemplate restTemplate = new RestTemplate();
		Map<String, String> response = restTemplate.postForObject(githubAccessTokenUrl, null, Map.class);

		Session session = new Session();
		if (response != null) {
			session.setCodeToken(response.get("access_token"));
			String userUrl = "https://api.github.com/user";

			HttpHeaders headers = new HttpHeaders();
			headers.setBearerAuth(session.getCodeToken());

			HttpEntity<String> entity = new HttpEntity<>("", headers);

			ResponseEntity<Map> userResponse = restTemplate.exchange(userUrl, HttpMethod.GET, entity, Map.class);
			if (userResponse.getStatusCode().is2xxSuccessful()) {
				Map<String, Object> userMap = userResponse.getBody();
				String username = (String) userMap.get("login");
				session.setUserName(username);
			}
		}

		return session;
	}
}
