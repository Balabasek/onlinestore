package com.example.restservice;

import com.example.dtos.item.CreateItemDto;
import com.example.dtos.item.DeleteItemDto;
import com.example.dtos.item.UpdateStockItemsDto;
import com.example.model.Item;
import com.example.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("itemService")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@GetMapping("/load")
	@ResponseBody
	public String loadAllItem() {
		try {
			return itemService.loadAllItem();
		} catch (Exception e) {
			System.err.println("Error occurred while load all item data");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
		}
		return "Error";
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
			System.err.println("Error occurred while create new item!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
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
			System.err.println("Error occurred while delete item!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
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
			System.err.println("Error occurred while update stock item!");
			System.err.println(e.getMessage());
			Arrays.stream(e.getStackTrace()).toList().forEach(System.err::println);
			return null;
		}
	}
}
