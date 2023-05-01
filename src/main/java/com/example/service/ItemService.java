package com.example.service;

import com.example.dtos.item.DeleteItemDto;
import com.example.dtos.item.UpdateStockItemsDto;
import com.example.model.Item;
import com.example.persistence.ItemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item createNewItem(Item item) throws IllegalArgumentException, OptimisticLockingFailureException {
        return itemRepository.save(item);
    }

    public DeleteItemDto deleteItem(String itemId) {
        Item deletedItem = itemRepository.deleteItemById(itemId);

        return new DeleteItemDto(deletedItem.getId(), deletedItem.getTitle(), deletedItem.getCategory());
    }

    public String loadAllItem() throws IOException {
        List<Item> items = itemRepository.findAll();

        ObjectMapper mapper = JsonMapper.builder()
                .enable(SerializationFeature.INDENT_OUTPUT, SerializationFeature.WRITE_SINGLE_ELEM_ARRAYS_UNWRAPPED).build();
        ObjectNode rootNode = mapper.createObjectNode();

        for (int i = 0; i < items.size(); i++) {
            ObjectNode itemNode = mapper.valueToTree(items.get(i));
            rootNode.set("item" + (i + 1), itemNode);
        }

        mapper.writeValue(new File("front/src/components/DATA/products.json"), rootNode);
        return "Load successes";
    }

    public String updateStockItems(List<UpdateStockItemsDto> updateStockItemsDto) {
        for (UpdateStockItemsDto dto : updateStockItemsDto) {
            Item item = itemRepository.findItemById(dto.getId());
            if (item == null) {
                System.out.println("Item " + dto.getId() + " not found!");
                continue;
            }

            if (item.getStock() >= dto.getCount() && dto.isBuy()) {
                item.setStock(item.getStock() - dto.getCount());
                itemRepository.save(item);
            } else {
                item.setStock(item.getStock() + dto.getCount());
                itemRepository.save(item);
            }
        }
        return "Ok";
    }
}
