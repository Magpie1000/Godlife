package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.BingoService;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bingo")
public class BingoController {

    private final BingoService bingoService;

    @GetMapping
    public ResponseEntity<List<FindBingoResDto>> findAllByUser(@Auth User user){
        List<FindBingoResDto> response = bingoService.findAllBingo(user.getEmail());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{code}")
    public ResponseEntity<FindBingoResDto> findByCode(@PathVariable Long code) {
        FindBingoResDto response = bingoService.findBingo(code);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<BaseResponseEntity> saveBingo(@Auth User user, @RequestBody @Valid SaveBingoReqDto reqDto){
        bingoService.createBingo(user.getEmail(), reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}")
    public ResponseEntity<BaseResponseEntity> updateTitle(@PathVariable String seq, @RequestBody @Valid UpdateTitleReqDto reqDto){
        bingoService.updateTitle(seq, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/activate")
    public ResponseEntity<BaseResponseEntity> updateActivate(@PathVariable String seq){
        bingoService.updateActivate(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/godlife")
    public ResponseEntity<BaseResponseEntity> updateGodlife(@PathVariable String seq){
        bingoService.updateGodlife(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/like")
    public ResponseEntity<BaseResponseEntity> updateLikeCnt(@PathVariable String seq){
        bingoService.updateLikeCnt(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/{seq}/comment")
    public ResponseEntity<BaseResponseEntity> addComment(@PathVariable String seq, @RequestBody SaveCommentReqDto reqDto){
        bingoService.addComment(seq, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}