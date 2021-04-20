import React from 'react';
import { Animated } from 'react-native';
import { makeStyles } from 'components/theme';

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: 'icomoon',
  },
}));

const Icon = ({ name, style = 'solid', size = 30, color = 'black' }) => {
  const styles = useStyles();
  return (
    <Animated.Text
      style={[
        styles.text,
        {
          fontSize: size,
          color,
        },
      ]}
      allowFontScaling={false}
    >
      {name}-{style}
    </Animated.Text>
  );
};

export default Icon;
