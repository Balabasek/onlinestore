package com.example.restservice;

import com.example.dtos.item.CreateItemDto;
import com.example.dtos.item.DeleteItemDto;
import com.example.dtos.item.UpdateStockItemsDto;
import com.example.logger.LoggerProvider;
import com.example.model.Item;
import com.example.service.ItemService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("itemService")
public class ItemController {

	@Autowired
	private ItemService itemService;

	private Logger logger;

	@Autowired
	public void SetLogger(LoggerProvider loggerProvider) {
		logger = loggerProvider.getLogger();
	}

	@GetMapping("/load")
	@ResponseBody
	public String loadAllItem() {
		try {
			return itemService.loadAllItem();
		} catch (Exception e) {
			logger.error("Error occurred while load all item data", e);
		}
		return "Error load item";
	}

	@PostMapping(
			value = "/create",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Item createItem(@RequestBody CreateItemDto createItemDto) {
		try {
			return itemService.createNewItem(createItemDto);
		} catch (Exception e) {
			logger.error("Error occurred while create new item!", e);
		}
		return null;
	}

	@DeleteMapping(
			value = "/delete/{itemId}",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public DeleteItemDto deleteItem(@PathVariable(value = "itemId") long id) {
		try {
			return itemService.deleteItem(id);
		} catch (Exception e) {
			logger.error("Error occurred while delete item!", e);
		}
		return null;
	}

	@PostMapping(
			value = "/updateStockItems",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String updateStockItems(@RequestBody List<UpdateStockItemsDto> updateStockItemsDto) {
		try {
			return itemService.updateStockItems(updateStockItemsDto);
		} catch (Exception e) {
			logger.error("Error occurred while update stock item!", e);
		}
		return "Error occurred while update stock item";
	}
}
