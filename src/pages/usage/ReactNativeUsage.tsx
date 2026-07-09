import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import SectionHeader from '../../components/usage/SectionHeader';
import { FaReact } from 'react-icons/fa';

interface Props {
    markdownContent: string;
    copiedField: string | null;
    onCopy: (text: string, field: string) => void;
}

export default function ReactNativeUsage({ markdownContent, copiedField, onCopy }: Props) {
    return (
        <section id="react-native-usage" data-section className="mb-16 scroll-mt-24">
            <SectionHeader
                id="react-native-usage"
                title="React Native"
                level="h2"
                markdownContent={markdownContent}
                icon={<FaReact className="text-[#61DAFB]" size={30} />}
            />

            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
                The official React Native package for Reicon. Import beautifully crafted icons as React Native components with full TypeScript support and react-native-svg integration. All icons are tree-shakeable, ensuring only the icons you use end up in your bundle.
            </p>

            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
            <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
                <li>Import icons as individual React Native components</li>
                <li>Customize size, color, and weight via props</li>
                <li>Tree-shake unused icons to keep bundle sizes minimal</li>
                <li>Full TypeScript support with autocompletion</li>
                <li>Works with Expo and bare React Native projects</li>
                <li>Supports iOS and Android platforms</li>
            </ul>

            {/* Installation */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Installation</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Install both <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code> and <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">react-native-svg</code> as the package requires SVG support.
            </p>

            <InstallTabs
                packageName="reicon-react-native react-native-svg"
                copiedField={copiedField}
                onCopy={onCopy}
            />

            <div className="mt-4 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">For Expo:</span> Run <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">npx expo install react-native-svg</code> instead.
            </div>

            <div className="mt-4 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">For iOS:</span> After installing, run <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">cd ios && pod install</code> to link native dependencies.
            </div>

            {/* Basic Usage */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Basic Usage</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Import icons by their PascalCase name from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-react-native</code>. Each icon is a React Native component that works with react-native-svg.
            </p>

            <SyntaxBlock
                title="JSX"
                onCopy={() => onCopy("import { View } from 'react-native';\nimport { Home, ShieldCheck, Bell } from 'reicon-react-native';\n\nfunction App() {\n  return (\n    <View>\n      <Home size={24} />\n      <ShieldCheck size={24} color=\"#6C5CE7\" />\n      <Bell size={24} weight=\"Filled\" />\n    </View>\n  );\n}", 'rn-basic')}
                copied={copiedField === 'rn-basic'}
            >
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">View</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Home</span>
                <span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">ShieldCheck</span>
                <span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">Bell</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n\n'}
                <span className="text-[#c678dd]">function</span>
                <span className="text-[#61afef]"> App</span>
                <span className="text-text-base/70">() {'{'}</span>
                {'\n  '}
                <span className="text-[#c678dd]">return</span>
                <span className="text-text-base/70"> (</span>
                {'\n    '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">View</span><span className="text-text-base/70">{'>'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">ShieldCheck</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#6C5CE7"</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Bell</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n    '}
                <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">View</span><span className="text-text-base/70">{'>'}</span>
                {'\n  '}
                <span className="text-text-base/70">);</span>
                {'\n'}
                <span className="text-text-base/70">{'}'}</span>
            </SyntaxBlock>

            {/* Customizing Icons */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Customizing Icons</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Every icon component accepts props to customize its appearance. You can also pass any standard react-native-svg props.
            </p>

            <SyntaxBlock
                title="Props"
                onCopy={() => onCopy('// Size\n<Home size={16} />\n<Home size={24} />\n<Home size={32} />\n\n// Color\n<Heart color="#ef4444" />\n<Heart color="rgb(99, 102, 241)" />\n\n// Weight\n<Star />                     // Outline (default)\n<Star weight="Filled" />     // Filled\n\n// Style\n<Home style={{ marginRight: 8 }} />', 'rn-props')}
                copied={copiedField === 'rn-props'}
            >
                <span className="text-text-base/30">{'// Size'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}16{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}24{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}32{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n\n'}
                <span className="text-text-base/30">{'// Color'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"#ef4444"</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span><span className="text-[#d19a66]"> color</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"rgb(99, 102, 241)"</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n\n'}
                <span className="text-text-base/30">{'// Weight'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'                     // Outline (default)'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Star</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-[#98c379]">"Filled"</span><span className="text-text-base/70"> /{'>'}</span><span className="text-text-base/30">{'     // Filled'}</span>
                {'\n\n'}
                <span className="text-text-base/30">{'// Style'}</span>
                {'\n'}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Home</span><span className="text-[#d19a66]"> style</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{{'}</span><span className="text-[#d19a66]"> marginRight</span><span className="text-text-base/70">:</span><span className="text-[#d19a66]"> 8</span><span className="text-text-base/70"> {'}}'}</span><span className="text-text-base/70"> /{'>'}</span>
            </SyntaxBlock>

            {/* Direct Import for Smaller Bundles */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Direct Import for Smaller Bundles</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                For the smallest bundle size, import each icon directly from its own module. Metro bundler will tree-shake automatically, but direct imports guarantee minimal code.
            </p>

            <SyntaxBlock
                title="Direct Import"
                onCopy={() => onCopy("import Home from 'reicon-react-native/icons/Home';\nimport ShieldCheck from 'reicon-react-native/icons/ShieldCheck';", 'rn-direct')}
                copied={copiedField === 'rn-direct'}
            >
                <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> Home</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react-native/icons/Home'</span><span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span><span className="text-[#e5c07b]"> ShieldCheck</span><span className="text-[#c678dd]"> from</span><span className="text-[#98c379]"> 'reicon-react-native/icons/ShieldCheck'</span><span className="text-text-base/30">;</span>
            </SyntaxBlock>

            {/* React Navigation Example */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">React Navigation Tab Icons</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Reicon works seamlessly with React Navigation. Use different weights to indicate active/inactive tabs.
            </p>

            <SyntaxBlock
                title="Navigation Example"
                onCopy={() => onCopy("import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\nimport { Home, Search, User } from 'reicon-react-native';\n\nconst Tab = createBottomTabNavigator();\n\nfunction AppTabs() {\n  return (\n    <Tab.Navigator\n      screenOptions={({ route }) => ({\n        tabBarIcon: ({ focused, color, size }) => {\n          let Icon;\n          if (route.name === 'Home') Icon = Home;\n          else if (route.name === 'Search') Icon = Search;\n          else Icon = User;\n          \n          return <Icon size={size} color={color} weight={focused ? 'Filled' : 'Outline'} />;\n        },\n      })}\n    >\n      <Tab.Screen name=\"Home\" component={HomeScreen} />\n      <Tab.Screen name=\"Search\" component={SearchScreen} />\n      <Tab.Screen name=\"Profile\" component={ProfileScreen} />\n    </Tab.Navigator>\n  );\n}", 'rn-nav')}
                copied={copiedField === 'rn-nav'}
            >
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">createBottomTabNavigator</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> '@react-navigation/bottom-tabs'</span>
                <span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Home</span><span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">Search</span><span className="text-text-base/70">, </span>
                <span className="text-[#e5c07b]">User</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n\n'}
                <span className="text-[#c678dd]">const</span><span className="text-[#e5c07b]"> Tab</span><span className="text-text-base/70"> = </span><span className="text-[#61afef]">createBottomTabNavigator</span><span className="text-text-base/70">();</span>
                {'\n\n'}
                <span className="text-[#c678dd]">function</span><span className="text-[#61afef]"> AppTabs</span><span className="text-text-base/70">() {'{'}</span>
                {'\n  '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> (</span>
                {'\n    '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Tab.Navigator</span>
                {'\n      '}
                <span className="text-[#d19a66]">screenOptions</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}({'{'} route {'}'}) =&gt; ({'{'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">tabBarIcon</span><span className="text-text-base/70">: ({'{'} focused, color, size {'}'}) =&gt; {'{'}</span>
                {'\n          '}
                <span className="text-text-base/30">// ... Icon selection logic</span>
                {'\n          '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> {'<'}</span><span className="text-[#e06c75]">Icon</span><span className="text-[#d19a66]"> weight</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">focused</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'Filled'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'Outline'</span><span className="text-text-base/70">{'}'}</span><span className="text-text-base/70"> /{'>'}</span>
                {'\n        '}
                <span className="text-text-base/70">{'}'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'})'}'</span>
                {'\n    '}
                <span className="text-text-base/70">{'>'}</span>
                {'\n      '}
                <span className="text-text-base/30">{'// Tab screens...'}</span>
                {'\n    '}
                <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">Tab.Navigator</span><span className="text-text-base/70">{'>'}</span>
                {'\n  '}
                <span className="text-text-base/70">);</span>
                {'\n'}
                <span className="text-text-base/70">{'}'}</span>
            </SyntaxBlock>

            {/* Pressable Icons */}
            <h3 className="text-lg font-serif text-text-base mb-4 mt-10">Touchable/Pressable Icons</h3>
            <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
                Wrap icons in Pressable or TouchableOpacity for interactive buttons with dynamic states.
            </p>

            <SyntaxBlock
                title="Pressable Example"
                onCopy={() => onCopy("import { Pressable } from 'react-native';\nimport { Heart } from 'reicon-react-native';\n\nfunction LikeButton() {\n  const [liked, setLiked] = useState(false);\n  \n  return (\n    <Pressable onPress={() => setLiked(!liked)}>\n      <Heart\n        weight={liked ? 'Filled' : 'Outline'}\n        color={liked ? '#ef4444' : '#6b7280'}\n        size={28}\n      />\n    </Pressable>\n  );\n}", 'rn-pressable')}
                copied={copiedField === 'rn-pressable'}
            >
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Pressable</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n'}
                <span className="text-[#c678dd]">import</span>
                <span className="text-text-base/70">{' { '}</span>
                <span className="text-[#e5c07b]">Heart</span>
                <span className="text-text-base/70">{' } '}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> 'reicon-react-native'</span>
                <span className="text-text-base/30">;</span>
                {'\n\n'}
                <span className="text-[#c678dd]">function</span><span className="text-[#61afef]"> LikeButton</span><span className="text-text-base/70">() {'{'}</span>
                {'\n  '}
                <span className="text-[#c678dd]">const</span><span className="text-text-base/70"> [</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70">, </span><span className="text-[#e5c07b]">setLiked</span><span className="text-text-base/70">] = </span><span className="text-[#61afef]">useState</span><span className="text-text-base/70">(</span><span className="text-[#d19a66]">false</span><span className="text-text-base/70">);</span>
                {'\n  \n  '}
                <span className="text-[#c678dd]">return</span><span className="text-text-base/70"> (</span>
                {'\n    '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Pressable</span><span className="text-[#d19a66]"> onPress</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-text-base/70">() =&gt; </span><span className="text-[#61afef]">setLiked</span><span className="text-text-base/70">(!</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70">)</span><span className="text-text-base/70">{'}'}</span><span className="text-text-base/70">{'>'}</span>
                {'\n      '}
                <span className="text-text-base/70">{'<'}</span><span className="text-[#e06c75]">Heart</span>
                {'\n        '}
                <span className="text-[#d19a66]">weight</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'Filled'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'Outline'</span><span className="text-text-base/70">{'}'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">color</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}</span><span className="text-[#e5c07b]">liked</span><span className="text-text-base/70"> ? </span><span className="text-[#98c379]">'#ef4444'</span><span className="text-text-base/70"> : </span><span className="text-[#98c379]">'#6b7280'</span><span className="text-text-base/70">{'}'}</span>
                {'\n        '}
                <span className="text-[#d19a66]">size</span><span className="text-text-base/50">=</span><span className="text-text-base/70">{'{'}28{'}'}</span>
                {'\n      '}
                <span className="text-text-base/70">/{'>'}</span>
                {'\n    '}
                <span className="text-text-base/70">{'</'}</span><span className="text-[#e06c75]">Pressable</span><span className="text-text-base/70">{'>'}</span>
                {'\n  '}
                <span className="text-text-base/70">);</span>
                {'\n'}
                <span className="text-text-base/70">{'}'}</span>
            </SyntaxBlock>

            <div className="mt-6 bg-[#61DAFB]/5 border border-[#61DAFB]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed">
                <span className="text-[#61DAFB] font-medium">Note:</span> All icons work seamlessly with both Expo and bare React Native projects. Supports iOS and Android out of the box.
            </div>
        </section>
    );
}
