package com.example.service;

import com.example.dtos.item.DeleteItemDto;
import com.example.dtos.item.UpdateStockItemsDto;
import com.example.model.Item;
import com.example.persistence.ItemRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.RandomAccessFile;
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

    public String loadAllItem() {
        final String outFile = "front/src/components/DATA/_products.ts";
        List<Item> items = itemRepository.findAll();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String products = gson.toJson(items);

        try (RandomAccessFile file = new RandomAccessFile(outFile, "rw")) {
            file.setLength(0);
            file.write("import { IitemDATA } from \"../typingTS/_interfaces\";\n\n".getBytes());
            file.write("export const products: Array<IitemDATA> = \n".getBytes());
            file.write(products.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return "Error load";
        }
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
