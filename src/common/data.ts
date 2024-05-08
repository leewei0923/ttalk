import IconExpressionlessFace from '@src/images/icon/expressionless_face_color.svg';
import grinningFaceWithSmilingEyes from '@src/images/icon/grinning_face_with_smiling_eyes_color.svg';
import loudlyCryingFace from '@src/images/icon/loudly_crying_face_color.svg';
import pleadingFace from '@src/images/icon/pleading_face_color.svg';
import smilingFaceWithSmilingEyes from '@src/images/icon/smiling_face_with_smiling_eyes_color.svg';
import worriedFace from '@src/images/icon/worried_face_color.svg';

export interface MoodDataType {
  name: string;
  type: string;
  element: any;
}

export const MOODDATAS = [
  {
    name: '开心到起飞',
    type: 'FaceWithSmilingEyes',
    element: grinningFaceWithSmilingEyes
  },
  {
    name: '还算满意',
    type: 'smilingFaceWithSmilingEyes',
    element: smilingFaceWithSmilingEyes
  },
  {
    name: '我要哭死',
    type: 'loudlyCryingFace',
    element: loudlyCryingFace
  },
  {
    name: '我好委屈',
    type: 'pleadingFace',
    element: pleadingFace
  },
  {
    name: '真的无语',
    type: 'expressionlessFace',
    element: IconExpressionlessFace
  },
  {
    name: '怎会这样',
    type: 'worriedFace',
    element: worriedFace
  }
];
