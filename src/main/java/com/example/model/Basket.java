package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document
public class Basket {
	@Id
	private String id;

	@DBRef
	private List<Item> itemList;

	private Map<String, Long> mapItemCount;

	public Basket() {
		this.id = UUID.randomUUID().toString();
		this.itemList = new LinkedList<>();
		mapItemCount = new HashMap<>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void addNewItem(Item item) {
		if (!itemList.contains(item)) {
			itemList.add(item);
			mapItemCount.put(item.getUniqId(), 1L);
		}
	}

	public void increaseItemCount(Item item) {
		if (item != null) {
			long count = mapItemCount.get(item.getUniqId());
			mapItemCount.put(item.getUniqId(), count + 1);
		}
	}

	public void decreaseItemCount(Item item) {
		if (item != null) {
			long count = mapItemCount.get(item.getUniqId());
			if (count == 1) {
				mapItemCount.remove(item.getUniqId());
				itemList.removeIf(item1 -> item1.getUniqId().equals(item.getUniqId()));
			} else {
				mapItemCount.put(item.getUniqId(), count - 1);
			}
		}
	}

	public List<Item> getItemList() {
		return itemList;
	}

	public void setItemList(List<Item> itemList) {
		this.itemList = itemList;
	}

	public void deleteItem(Item item) {
		for (Item entity : itemList) {
			if (entity.getUniqId().equals(item.getUniqId())) {
				itemList.remove(entity);
				break;
			}
		}
	}

	public Map<String, Long> getMapItemCount() {
		return mapItemCount;
	}

	public void setMapItemCount(Map<String, Long> mapItemCount) {
		this.mapItemCount = mapItemCount;
	}
}
