import { Text, View } from '@tarojs/components';

export default function Index() {
  return (
    <View className="mt-40 mx-auto py-3 px-3 w-9/12 rounded-xl border border-slate-300 bg-white shadow-xl">
      <View className="font-bold text-xl text-center">
        <Text className="text-slate-800">👋 Hey,</Text>
      </View>

      <View className="font-bold text-xl text-center">
        <Text className="text-orange-400">Nice</Text>
        <Text className="text-slate-800"> to meet you!</Text>
      </View>

      <View className="mt-4 text-base text-center text-slate-600">
        <Text>{'Let\'s start this new project with '}</Text>
        <Text style={{ color: '#3578e5' }}>Taro</Text>
        <Text> and </Text>
        <Text style={{ color: '#149eca' }}>React</Text>
        <Text>.</Text>
      </View>

      <View className="mt-5 text-center">
        <Text className="text-sm text-slate-400">taro-applet-boilerplate</Text>
      </View>
    </View>
  );
}
