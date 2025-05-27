'use client';

import {
  useInView,
  useMotionValue,
  useSpring,
  // MotionValue,
  // TargetAndTransition,
} from 'framer-motion';
import { FC, useEffect, useRef } from 'react';

// 型定義
type AnimatedNumbersProps = {
  value: number;
};

// valueで渡した数値までのカウントアップ実装
export const AnimatedNumbers: FC<AnimatedNumbersProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null); // HTML（spanタグ）へのアクセス

  const motionValue = useMotionValue(0); // 数値の値の変化を監視（初期値0）→valueまで変化
  const springValue = useSpring(motionValue, { duration: 3000 }); // アニメーションの制御
  const isInview = useInView(ref, {
    // refが画面内に表示されたかを検出
    once: true,
  }) as boolean;

  useEffect(() => {
    // タイマー処理 = 副作用
    if (isInview && motionValue.get() !== value) {
      // valueに渡した値まで変化する
      motionValue.set(value);
    }
  }, [isInview, value, motionValue]); // 依存配列のstate更新の度

  useEffect(() => {
    springValue.on('change', (latest) => {
      // springValue変更時に実行される関数の登録（onメソッド）
      if (ref.current && Number(latest.toFixed(0)) <= value) {
        ref.current.textContent = latest.toFixed(0); // 小数点以下は切り捨て表示
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};
